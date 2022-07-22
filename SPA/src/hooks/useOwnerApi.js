
const useOwnerApi=()=>{
    const createOrder=async(data,token)=>{
        console.log(token, "create");
        const response = await fetch(`http://localhost:3030/api/data/create`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
          body: JSON.stringify(data),
        });
      
        return response.json();
    }
    const deleteOrder=async(id,token)=>{
        console.log(token,'deeeeeeeeeeeee')
        let res=await fetch(`http://localhost:3030/api/owner/${id}`, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              "X-Authorization": token,
            }
        })
        return res
    }
    const updateOrder=async(data, id, token)=> {
        
        const response = await fetch(`http://localhost:3030/api/owner/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
          body: JSON.stringify(data),
        });
      
        return await response.json();
      }
    return[createOrder,deleteOrder,updateOrder]
}
export default useOwnerApi;