/* eslint-disable */
import $ from 'jquery';

function wizard() {

  $(".input").focus(function(){
    $(this).addClass("is-active is-completed");
  });

  $(".input").focusout(function(){
    if($(this).val() === "") {
      $(this).removeClass("is-completed");
    }
    $(this).removeClass("is-active");
  })


  $('[name="IsJob"]').on('change', function(event) {
    if ($(this).val() == 2) {
      $('.filter-on').css('display', 'none');
      $('#trabaho_atual').attr('required', false);
    } else {
      $('.filter-on').css('display', 'table');
      $('#trabaho_atual').attr('required', true);
    }
  });

  $('#curso').on('change', function(event) {
    let value = $(this).val();

    if (value == '' || value == 0) {
      $('.filter-university').css('display', 'none');
      $('#Semester').attr('required', false);
    } else {
      $('.filter-university').css('display', 'table');
      $('#Semester').attr('required', true);
    }
  });

  const checkButtons = (activeStep, stepsCount) => {
    const nextBtn = $('.wizard-next');
    const submBtn = $('.wizard-subm');

    switch (activeStep / stepsCount) {
      case 0: // Primeiro Step
        submBtn.hide();
        nextBtn.show();
        break;
      case 1: // Ultimo Step
        nextBtn.hide();
        submBtn.show();
        break;
      default:
        submBtn.hide();
        nextBtn.show();
    }
  };

  const setWizardHeight = (activeStepHeight) => {
    $('.wizard-body').height(activeStepHeight);
  };

  let wizardSteps = $('.wizard-step');
  let steps = $('.wizard-body .step');
  let stepsCount = steps.length - 1;
  let viewHeight = $(window).height();
  let activeStep = 0;
  let activeStepHeight = $(steps[activeStep]).height();

  checkButtons(activeStep, stepsCount);
  setWizardHeight(activeStepHeight);

  $(window).resize(() => {
    setWizardHeight($(steps[activeStep]).height());
  });

  const scrollWindow = (activeStepHeight, viewHeight) => {
    if (viewHeight < activeStepHeight) {
      $(window).scrollTop($(steps[activeStep]).offset().top - viewHeight / 2);
    }
  };

  $('.button').click((e) => {
    e.preventDefault();

    var that = e;
    const curInputs = $(steps[activeStep]).find('input[required=true], input[required=required],input[required="true"], input[type=radio],textarea, select');
    let isValid = true;

    $('#first-step-header').hide();
    $('.input-group, .card').removeClass('-has-error');

    // eslint-disable-next-line
    for (let i = 0; i < curInputs.length; i++) {
      if ( !curInputs[i].validity.valid || $(curInputs[i]).closest('.input-group').is('.-has-incomplete')) {
        isValid = false;
        $(curInputs[i]).closest('.input-group').addClass('-has-error');
        $(curInputs[i]).closest('.card').addClass('-has-error');
      }
    }

    if (isValid) {
      if (that.target.id === 'wizard-subm') {
        $('button').html('Aguarde, enviando').attr('disabled', 'disabled').addClass('load');
        setTimeout(function(){
        $('form').submit();
        }, 5000)
      }else{
        $(steps[activeStep]).removeClass('inital').addClass('off').removeClass('active');
        $(wizardSteps[activeStep]).removeClass('site-nav__current');

        activeStep += 1;

        if (activeStep === 2) {
          $('.wizard-body').css('overflow', 'hidden');
        }

        $(steps[activeStep]).addClass('active');
        $(wizardSteps[activeStep]).addClass('site-nav__current');
        activeStepHeight = $(steps[activeStep]).height();
        setWizardHeight(activeStepHeight);
        checkButtons(activeStep, stepsCount);
        scrollWindow(activeStepHeight, viewHeight);
      }
    }else{
      $(window).scrollTop($('.-has-error').eq(0).offset().top);
      $('.-has-error').eq(0).find('input').focus();
    }
  });
}

export default foto();
