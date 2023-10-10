$(document).ready(function () {
  
  function saveJob(newJob) {
    var jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  
  function removeJobFromLocalStorage(jobId) {
    var jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    var updatedJobs = jobs.filter(function (job) {
      return job.id !== jobId;
    });
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  }

  
  function displayJobs() {
    var jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    var jobContainer = $('#jobContainer'); 

    jobContainer.empty(); 

    jobs.forEach(function (job, index) {
     
      var jobId = 'job-' + job.id;

    
      var jobItem = $('<div class="container" id="' + jobId + '"></div>');

     
      var deleteButton = $('<button class="delete-button" data-job-id="' + job.id + '">Delete</button>');

     
      var jobDetails = $('<div class="job-details"></div>');
      jobDetails.text(`Job ${index + 1}: ${job.role} at ${job.companyName}`);

     
      jobItem.append(deleteButton);
      jobItem.append(jobDetails);

      jobContainer.append(jobItem); 
    });
  }

 
  displayJobs();

 
  $('#jobForm').submit(function (event) {
    event.preventDefault(); 

  
    var role = $('input[name="role"]:checked').val();
    var fullName = $('#fullName').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var companyName = $('#companyName').val();
    var jobDescription = $('#jobDescription').val();
    var contactEmail = $('#contactEmail').val();

  
    var jobId = Date.now(); 
    var newJob = {
      id: jobId, 
      role: role,
      fullName: fullName,
      email: email,
      phone: phone,
      companyName: companyName,
      jobDescription: jobDescription,
      contactEmail: contactEmail
    };


    saveJob(newJob);

  
    $('#jobForm')[0].reset();

   
    displayJobs();
  });

 
  $(document).on("click", ".delete-button", function () {

    var jobId = $(this).data("job-id");

 
    var jobContainer = $(this).closest('.container');

   
    jobContainer.remove();

    
    removeJobFromLocalStorage(jobId);
  });
});
