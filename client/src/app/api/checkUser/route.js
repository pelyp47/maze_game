export const POST = async (req) => {
    const reqData = await req.json()
    
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/user?name=${reqData.name}`
    
    const fetchData = await fetch(url, {
        method: "GET"
    });
    
    const data = await fetchData.json()
    
    data.loggedIn = !!data.id&&!!data.name
    return Response.json(data)
}