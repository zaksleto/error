"use client"
import Navbar from "@/components/system/navbar";
import React from "react";
import { deleteApp, getApp, initializeApp } from 'firebase/app';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [hasToLogin, setHasToLogin] = React.useState(false);
    const [error, setError] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const app = getApp();
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            setHasToLogin(false);
        } catch (error) {
            console.error(error);
            // Add toast or error handling here
            toast({
                title: "Erro ao entrar",
                description: "Verifique suas credenciais e tente novamente.",
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        const script = localStorage.getItem("firebase-script");
        console.log(script)
        if (!script) {
            setError(true);
            return;
        }
        let useScript: string = script;
        // remove everything before "const firebaseConfig = {" 
        const removeBefore = "const firebaseConfig = {"
        useScript = useScript.substring(useScript.indexOf(removeBefore));
        useScript = useScript.replace(removeBefore, "");
        // remove everything after "};"
        const removeAfter = "};"
        useScript = useScript.substring(0, useScript.indexOf(removeAfter) + 1);
        useScript = useScript.replace(removeAfter, "");
        
        /**
         * example string:
         "
    apiKey: "AIzaSyCg3opkArhV_2EOP_RymafmEmyAS70FZcI",
    authDomain: "test-zaks.firebaseapp.com",
    projectId: "test-zaks",
    storageBucket: "test-zaks.firebasestorage.app",
    messagingSenderId: "858602693080",
    appId: "1:858602693080:web:34bda1ecea5a089db892ad"
  }"
         */
        // line by line get the vars
        let apiKey: string = "";
        let authDomain: string = "";
        let projectId: string = "";
        let storageBucket: string = "";
        let messagingSenderId: string = "";
        let appId: string = "";

        const lines = useScript.split("\n");
        lines.forEach(line => {
            if (line.includes("apiKey")) {
                apiKey = line.split(":")[1].replace("\"", "").trim().replace("\",", "");
            } else if (line.includes("authDomain")) {
                authDomain = line.split(":")[1].replace("\"", "").trim().replace("\",", "");
            } else if (line.includes("projectId")) {
                projectId = line.split(":")[1].replace("\"", "").trim().replace("\",", "");
            } else if (line.includes("storageBucket")) {
                storageBucket = line.split(":")[1].replace("\"", "").trim().replace("\",", "");
            } else if (line.includes("messagingSenderId")) {
                messagingSenderId = line.split(":")[1].replace("\"", "").trim().replace("\",", "");
            } else if (line.includes("appId")) {
                appId = line.split(":")[1].replace("\"", "").trim();
            }
        });
        // @ts-expect-error If there is an app already, delete it
        if (window.app) {
            deleteApp(getApp())
        }
        // @ts-expect-error Inject Firebase SDK
        window.app = initializeApp({
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId
        });
        setHasToLogin(true);
        setLoading(false)
    }, []);
    const removeSDK = () => {
        localStorage.removeItem("firebase-script");
        router.push('/');
    }
    if (hasToLogin) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Entre com suas credenciais para continuar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email"
                                        type="email" 
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input 
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-row gap-2">
                            <Button onClick={removeSDK} variant="ghost" className="w-26">Alterar SDK</Button>
                            <Button onClick={handleLogin} className="w-full">Entrar</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    }
    if (error) {
        return <div>Erro ao carregar o SDK, volte para a página inicial e tente novamente.</div>
    }
    return <div className="h-full w-full flex-1 flex-col space-y-8 p-8 flex">
        {
            loading ? (
                <div onClick={() => {
                    try {
                        console.log(getApp());
                    } catch (error) {
                        console.log(error)
                    }
                }}>Carregando...</div>
            ) : (
                <>
                    <Navbar />
                    {children}
                </>
            )
        }
    </div>;
}