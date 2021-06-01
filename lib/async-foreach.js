module.exports = async (array, callback, continueProcess = true) => {
  if (continueProcess) {
    for (let index = 0; index < array.length; index++) {
      try {
        await callback(array[index], index, array);
      } catch (error) {
        continue;
      }
    }
  } else {
    for (let index = 0; index < array.length; index++) {
      try {
        await callback(array[index], index, array);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};
