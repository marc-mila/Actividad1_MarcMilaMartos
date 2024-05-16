function useLocalStorage(key) {
  const setItem = (value) => {
    try{
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  const getItem = () => {
    try{
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error){
      console.log(error)
    }
  }
  return [ getItem, setItem ];
}

export default useLocalStorage;