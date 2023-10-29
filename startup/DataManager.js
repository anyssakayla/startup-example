const DataManager = { //creating data manger to switch fom local storage to server when needed
    // Get task data from localStorage
    getTaskData: () => {
      const storedData = localStorage.getItem('taskData');
      return storedData ? JSON.parse(storedData) : null;
    },
    
    // Save task data to localStorage
    saveTaskData: (task) => {
      localStorage.setItem('taskData', JSON.stringify(task));
    },
  };
  
  // Export the module
  export default DataManager;

  // Clear localStorage after processing the task data 
  localStorage.removeItem('taskData');