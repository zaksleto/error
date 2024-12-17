"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea";
import React from "react";
// navigation
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [sdk, setSdk] = React.useState<string>("")
  const router = useRouter();
  const [step, setStep] = React.useState<number>(0);
  const [hasLocalSDK, setHasLocalSDK] = React.useState<boolean>(false);
  React.useEffect(() => {
    const localSDK = localStorage.getItem("firebase-script");
    if (localSDK) {
      setHasLocalSDK(true);
    }
  }, [])
  const handleAddSDK = () => {
    localStorage.setItem("firebase-script", sdk);
    setStep(1)
  }
  const handleAddFirestore = () => {
    router.push('/system/lista-funis');
  }
  const goToSystem = () => {
    router.push('/system/lista-funis');
  }
  const rules = `service cloud.firestore {
  match /databases/{database}/documents {
    
    // Rules for the 'funis-structure' collection
    match /funis-structure/{document=**} {
      // Anyone can read to the 'funis-structure' collection
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Rules for the 'funis-base' collection
    match /funis-base/{document=**} {
      // Anyone can read to the 'funis-base' collection
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Rules for the 'end' collection (authenticated users only)
    match /end/{document=**} {
      // Only authenticated users can read and write
      allow read: if request.auth != null;
      allow write: if true;
    }

    // Rules for the 'acessos' collection (authenticated users only)
    match /acessos/{document=**} {
      // Only authenticated users can read and write
      allow read: if request.auth != null;
      allow write: if true;
    }
  }
}
`

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Bem-vindo ao <span className="text-primary font-[family-name:var(--font-geist-mono)]">FreedomQuiz v2.3</span>
      </h1>
      {
        step === 0 && (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Adicionar o Firebase SDK {`<script>`}</CardTitle>
              <CardDescription>O primeiro passo para usar o builder é adicionar o SDK do Firebase. </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={sdk} onChange={(e) => setSdk(e.target.value)} placeholder="Adicione o SDK do Firebase aqui" className="w-full h-[300px]" />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button disabled={sdk.length === 0} onClick={handleAddSDK} className="w-full">Adicionar</Button> 
              <Button disabled={!hasLocalSDK}  variant="ghost" onClick={goToSystem} className="w-full">Já adicionei o SDK</Button> 
            </CardFooter>
          </Card>
        )
      }
      {
        step === 1 && (
          <Card className="w-[750px]">
            <CardHeader>
              <CardTitle>Criar um banco de dados Firestore</CardTitle>
              <CardDescription>Agora vamos criar um banco de dados Firestore para armazenar os funis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span>
                  1. Crie um projeto no Firebase.
                </span>
                <span>
                  2. Crie um banco de dados Firestore.
                </span>
                <span>
                  3. Ative a autenticação do Firebase e crie um usuário com <b>email</b> e <b>senha</b> para você acessar o sistema.
                </span>
                <span className="flex flex-col gap-1">
                  <span>4. Altere as regras do banco de dados <b>Firestore</b> para permitir que apenas usuários autenticados possam ler e escrever.</span>
                  <pre 
                    className="bg-muted p-2 rounded-md bg-slate-900 text-white h-[300px] overflow-y-auto cursor-pointer" 
                    onClick={() => {
                      navigator.clipboard.writeText(rules).then(() => {
                        toast({
                          title: "Regras copiadas",
                        description: "As regras foram copiadas para o clipboard.",
                        })
                      }).catch((err) => {
                        toast({
                          title: "Erro ao copiar",
                          description: "Ocorreu um erro ao copiar as regras.",
                        })
                      })
                    }}
                  >
                    {rules}
                  </pre>
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddFirestore} className="w-full">Pronto</Button> 
            </CardFooter>
          </Card>
        )
      }
    </div>
  );
}
