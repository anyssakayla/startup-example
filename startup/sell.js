// DOM elements
const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll('.multisteps-form__progress-btn'),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next'
};

// remove class from a set of items
const removeClasses = (elemSet, className) => {
  elemSet.forEach(elem => {
    elem.classList.remove(className);
  });
};

// return exact parent node of the element
const findParent = (elem, parentClass) => {
  let currentNode = elem;
  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }
  return currentNode;
};


const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

// set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {
  removeClasses(DOMstrings.stepsBtns, 'js-active');
  DOMstrings.stepsBtns.forEach((elem, index) => {
    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }
  });
};


const getActivePanel = () => {
  let activePanel;
  DOMstrings.stepFormPanels.forEach(elem => {
    if (elem.classList.contains('js-active')) {
      activePanel = elem;
    }
  });
  return activePanel;
};


const setActivePanel = activePanelNum => {
  removeClasses(DOMstrings.stepFormPanels, 'js-active');
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {
      elem.classList.add('js-active');
      setFormHeight(elem);
    }
  });
};

const formHeight = activePanel => {
  const activePanelHeight = activePanel.offsetHeight;
  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
};

const setFormHeight = () => {
  const activePanel = getActivePanel();
  formHeight(activePanel);
};


DOMstrings.stepsBar.addEventListener('click', e => {
  const eventTarget = e.target;
  if (!eventTarget.classList.contains(DOMstrings.stepsBtnClass)) {
    return;
  }
  const activeStep = getActiveStep(eventTarget);
  setActiveStep(activeStep);
  setActivePanel(activeStep);
});

// PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {
  const eventTarget = e.target;
  if (
    !(eventTarget.classList.contains(DOMstrings.stepPrevBtnClass) ||
      eventTarget.classList.contains(DOMstrings.stepNextBtnClass))
  ) {
    return;
  }
  const activePanel = findParent(eventTarget, DOMstrings.stepFormPanelClass);
  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
  if (eventTarget.classList.contains(DOMstrings.stepPrevBtnClass)) {
    activePanelNum--;
  } else {
    activePanelNum++;
  }
  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);
});


window.addEventListener('load', setFormHeight, false);

// set the height
window.addEventListener('resize', setFormHeight, false);

// not implementing this anymore but saving it if i want to reimplement later
const setAnimationType = newType => {
  DOMstrings.stepFormPanels.forEach(elem => {
    elem.dataset.animation = newType;
  });
};



$('#taskForm').on('submit', function (event) {
event.preventDefault();
if ($('#taskForm').valid()) {
    //const formData = $('#taskForm').serialize();
    const formData = new FormData();

    $('#taskForm .multisteps-form__input').each(function (){
      const inputType = $(this).attr('type');
      const inputName = $(this).attr('name');

      if(inputType == 'checkbox'){
        formData.append(inputName, $(this).prop('checked'));
       // formData[inputName] = $(this).prop('checked');
      }
      else{
        formData.append(inputName, $(this).val());
       // formData[inputName] = $(this).val();
      }
    });

    //start dealing with image input
    const fileInput = $('#taskImage')[0];
    const file = fileInput.files[0];
    formData.append('taskImage', file);
    console.log(file);
    console.log(formData);
    
    //send the form data 
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/taskForm', 
      data: formData,
      contentType: false,
      processData: false,
      
      success: function (response) {
        console.log('Task form data sent successfully:', response);
       // window.log('Your task has been submitted');
        window.location.href = 'sell.html';

      },
      error: function (error) {
        console.error('Error sending task form data:', error);
        // Handle error if needed
      },
    });
}
});