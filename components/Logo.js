import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className='text-5xl text-green-500 font-bold flex items-center'>
      <span>Fin</span><span className="text-white">Codez</span>
    </Link>
  );
}
