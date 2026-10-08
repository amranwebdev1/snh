import {createClient} from '@/lib/supabase/server' 
import {NextResponse} from "next/server" 
export const GET = async(req) =>{
  const {searchParams,origin} = new URL(req.url)
  const code = searchParams.get("code");
  if(code){
    const supabase = await createClient();
    const{error} = await supabase.auth.exchangeCodeForSession(code);
    if(!error) return NextResponse.redirect(`${origin}/`)
  }
  return NextResponse.redirect(`${origin}/auth/login`)
}