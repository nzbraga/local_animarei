import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkStatus(user,title){
    let existingData = await AsyncStorage.getItem(`@Fav${user}`);
    existingData = existingData ? JSON.parse(existingData) : [];
   
    // Check if the title already exists in the existing data
    const titleExists = existingData.some(item => item.title === title);
    //console.log(titleExists)
   
      return titleExists
   

} 