export const POST = async (req) => {
    const reqData = await req.json()
    console.log(reqData.name)
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/user?name=${reqData.name}`
    console.log(url)
    const fetchData = await fetch(url, {
        method: "GET"
    });
    console.log(fetchData)
    const data = await fetchData.json()
    console.log(data)
    data.loggedIn = !!data.id&&!!data.name
    return Response.json(data)
}