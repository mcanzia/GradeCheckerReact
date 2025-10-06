export default function LoginInput({ name, type, label, value, onChange }: { name: string, type: string, label: string, value: string, onChange: any }) {
    return (
        <>
            <label htmlFor={name} className="block text-sm/6 font-medium text-white">
                {label}
            </label>
            <div className="mt-2 w-full">
                <div className="flex items-center w-full rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <input
                        id={name}
                        name={name}
                        autoComplete={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    />
                </div>
            </div>
        </>
    )
}