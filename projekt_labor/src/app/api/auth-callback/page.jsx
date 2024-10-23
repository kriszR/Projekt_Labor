"use client";

import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

const Page = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const { data, isLoading, isSuccess, isError, error } = trpc.authCallback.useQuery(undefined, {
        retry: true,
        retryDelay: 500,
    });

    useEffect(() => {
        if (isSuccess && data?.success) {
            router.push(origin ? `/${origin}` : '/dashboard');
        } else if (isError && error?.data?.code === 'UNAUTHORIZED') {
            router.push("/sign-in")
        }
    }, [isSuccess, isError, data, error, origin, router]);

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                {isLoading && <Loader2 className='h-8 w-8 animate-spin text-zinc-300' />}
                <h3 className='font-semibold text-xl '>Fiók beállítása...</h3>
                <p>A rendszer automatikusan átirányítja</p>
            </div>
        </div>
    )
}

export default Page
