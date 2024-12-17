'use client'
 
import { usePathname } from 'next/navigation'
import { UserNav } from "./user-nav";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname()

    const systemRoutes = {
        '/system/builder': {
            titles: ['Builder de funis'],
            description: 'Criar, editar e gerenciar funis.',
        },
        '/system/lista-funis': {
            titles: [
                'Bem-vindo de volta!',
                'Lista de funis',
            ],
            description: 'Aqui está a lista de todos os seus funis.',
        },
    }


    // find the current route by start of string
    const currentRoute = Object.keys(systemRoutes).find(key => pathname.startsWith(key)) as keyof typeof systemRoutes

    const titles = systemRoutes[currentRoute].titles
    const randomTitle = titles[Math.floor(Math.random() * titles.length)]
    const description = systemRoutes[currentRoute].description

    return <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="rounded-md bg-[rgb(5,10,48)] text-white pr-4 pl-1.5 py-1 text-2xl font-bold tracking-tight flex flex-row gap-2 items-center mb-2">
            <div className='px-1'>
              <Image src="/logo_freedomquiz.png" alt="FreedomQuiz" width={40} height={40} />
            </div>
            {randomTitle}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
}