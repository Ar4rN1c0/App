import registerUser from "@/Actions/registerUser"

export default function RegisterPage() {

    return (
        <main className="w-screen h-headerless grid place-content-center">
            <form action={registerUser} className="w-[40vw] bg-slate-400 h-[50vh] py-10 rounded-md flex justify-middle  align-middle gap-3 flex-col">
                <input placeholder="Introduce your name" className="min-w-[200px] max-w-[250px]  rounded-md text-black m-auto" name="name" type="text" />
                <input placeholder="Introduce your surname" className="min-w-[200px] max-w-[250px]  rounded-md text-black m-auto" name="surname" type="text" />
                <input placeholder="Introduce your email" className="min-w-[200px] max-w-[250px]  rounded-md text-black m-auto" name="email" type="text" />
                <input placeholder="Introduce password" className="min-w-[200px] max-w-[250px]  rounded-md text-black m-auto" name="password" type="text" />
                <button className="min-w-[200px] max-w-[250px]  rounded-md text-black m-auto"  type="submit">Submit</button>
            </form>
        </main>
    )
}