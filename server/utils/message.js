export const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

export const generateLocationMessage=(from,lat,lng)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()

    }
}


export default{generateMessage,generateLocationMessage}