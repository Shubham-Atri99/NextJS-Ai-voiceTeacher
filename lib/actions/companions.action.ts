"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"



export const createCompanion = async(FormData:CreateCompanion)=>{
    const {userId:author}=await auth();
    const supabase=createSupabaseClient();
    const { data, error } = await supabase
  .from("companions")
  .insert({ ...FormData, author })
  .select()
  .single();


    if(error||!data){
        throw new Error(error?.message||"Failed to create companion")
    }   
    return data;
}
export const getallCompanions=async({limit=10,page=1,subject,topic}:GetAllCompanions)=>{
  const supabase=createSupabaseClient();
  let query=supabase.from("companions").select();
  if(subject&&topic){
    query=query.ilike("subject",`%${subject}%`).ilike("topic",`%${topic}%`)
  }else if(subject){
    query=query.ilike("subject",`%${subject}%`)
  }else if(topic){
    query=query.ilike("topic",`%${topic}%`)
  }
  query=query.range((page-1)*limit,page*limit-1)
  const {data:companions,error}=await query;
  if(error){
    throw new Error(error.message||"Failed to fetch companions")
  }
  return companions;

}

export const getCompanionById=async(id:string)=>{
  const supabase = createSupabaseClient();
  const {data,error}=await supabase
  .from("companions")
  .select()
  .eq("id",id)
  .single();
  if(error||!data){
    throw new Error(error?.message||"Failed to fetch companion")
  }
  return data;

}
export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) throw new Error(error.message);

    return data;
}