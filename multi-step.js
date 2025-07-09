$(document).ready(function () {
  let current_fs, next_fs, previous_fs;
  let current = 0;

  const fieldsets = $("#msform fieldset");
  const totalSteps = fieldsets.length - 2; // exclude welcome + success
  // Exclude welcome + success + 1-based index fix

  function setProgressBar(step) {
    let percent = 0;

    if (step === 0) {
      percent = 0;
    } else if (step === totalSteps + 1) {
      percent = 100;
    } else {
      percent = (100 / totalSteps) * (step - 1);
    }

    $(".progress-bar").css("width", percent + "%");

    // Toggle progress wrapper
    if (step === 0 || step === totalSteps + 1) {
      $(".progress-wrapper").addClass("hidden");
    } else {
      $(".progress-wrapper").removeClass("hidden");
    }

    // Update step counter
    if (step > 0 && step <= totalSteps) {
      $(".step-counter").text(`Question ${step} of ${totalSteps}`);
    } else {
      $(".step-counter").text("");
    }
  }

  // Start form from welcome
  $(".start-form").click(function () {
    const welcome_fs = $(this).closest("fieldset");
    const first_fs = welcome_fs.next("fieldset");

    welcome_fs.fadeOut(300, function () {
      first_fs.fadeIn(300);
    });

    current = 1;
    setProgressBar(current);
  });

// Next button with validation
$(".next").click(function () {
  current_fs = $(this).closest("fieldset");
  next_fs = current_fs.next("fieldset");

  // Get all radio buttons in current fieldset
  const radios = current_fs.find('input[type="radio"]');
  const groupName = radios.first().attr("name");

  // Check if any radio is selected in that group
  const isSelected = current_fs.find('input[name="' + groupName + '"]:checked').length > 0;

  if (!isSelected) {
    alert("Please select an option before proceeding.");
    return; // Stop going to the next step
  }

  current_fs.fadeOut(300, function () {
    next_fs.fadeIn(300);
  });

  current++;
  setProgressBar(current);
});

  // Previous button
  $(".previous").click(function () {
    current_fs = $(this).closest("fieldset");
    previous_fs = current_fs.prev("fieldset");

    current_fs.fadeOut(300, function () {
      previous_fs.fadeIn(300);
    });

    current--;
    setProgressBar(current);
  });

  $(".submit").click(function () {
    return false;
  });
});