class Config{

    config: any

    constructor(){
        this.config = {
            "page":{
                "title": "Giphy React APP",
                "placeholder": "Pizza!"
            },
            "api":{
                "key":"8NotAnqZix8DEeXvlRrUcsuj5LyrP5xw",
                "limit":25,
                "url":"https://api.giphy.com/v1/gifs/search?api_key="
            }
        }
    }

}

export default Config