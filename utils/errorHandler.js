export const responseErrorHandler = (error) => {
    console.log(error)
    if(error?.response?.status === 422){
        const errorArrays = error?.response?.data?.errors 
        if (errorArrays.length > 0) {

          let errorKeys = errorArrays.map(item => Object.keys(item)[0] + ": " + Object.values(item)[0] )
          let fields = ""
          errorKeys.map(item=> fields = fields + `${fields === "" ? '' : `,` }`+ item)

          return fields
        }
      }

      let resMessage =
            (error?.response &&
              error?.response?.data &&
              error?.response?.data?.message) ||
              error?.response?.data ||
            error?.message ||
            error.toString();

      if(resMessage === "Request failed with status code 500"){
        resMessage = "Oops Something went wrong Please try again later!!!";
      }

      if (errorMessage === 'Network Error') resMessage = "Oops, it seems you do not have internet access!!"
      if(resMessage === "invalid signature") resMessage = "Oops Seems the link has expired";
      

    return resMessage
}