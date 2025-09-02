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

export const getCompanionById=async(id:String)=>{
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
export const addToSessionHistory = async (companionId: String) => {
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
export const getrecentSessions=async(limit=10)=>{
  const supabase=createSupabaseClient();
  const {data,error}=await supabase
  .from("session_history")
  .select(`companions:companion_id(*)`)
  .order("created_at",{ascending:false})
  .limit(limit);

  if(error){
    throw new Error(error.message||"Failed to fetch recent sessions")
  }
  return data.map(({companions})=>companions)
}
export const getUserSessions=async(userId:string,limit=10)=>{
  const supabase=createSupabaseClient();
  const {data,error}=await supabase
  .from("session_history")
  .select(`companions:companion_id(*)`)
  .eq("user_id",userId)
  .order("created_at",{ascending:false})
  .limit(limit);
  if(error){
    throw new Error(error.message||"Failed to fetch recent sessions")
  }
  return data.map(({companions})=>companions)
}

export const getuserCompanions=async(userId:String)=>{
const supabase=createSupabaseClient();
const {data,error}=await supabase
.from("companions")
.select()
.eq("author",userId)
if(error){
  throw new Error(error.message||"Failed to fetch user companions") 
}
return data;
}