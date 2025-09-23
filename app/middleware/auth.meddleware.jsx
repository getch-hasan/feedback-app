import { getToken } from "@/utils/helpers"
import { redirect } from "next/dist/server/api-utils"
import { useLayoutEffect } from "react"

export const isAuth=(Component)=>{
return IsAuth=>(props)=>{
    const auth=getToken()
    useLayoutEffect(()=>{
        if(!auth){
            return redirect("/auth/login");
        }
    },[auth])
    if (!auth) {
        return null;
    }
    return <Component {...props} />;

}
}