This is the demonstration of the system where the unique questions are assigned to each region . 
Number of regions is a determining factor for performance as each user in the region will be assigned the same question.
Questions are assigned in cycles with a given period .

The problem is to reassign the available questions  and maintain the updated question list for this purpose after each cycle.

The solution given here depeneds upon the Bull or BullMQ (advanced version) libraries https://docs.bullmq.io/ , 
which  implements a fast and robust queue system built on top of Redis that helps in resolving many modern age micro-services architectures.

The solution is to assign each queue to each region , then add the repeateable job for every region . 
Questionlist will be updated after each cycle , by listening to the completed event for each job.
BullMQ provides provides Job Schedulers instead of repeatable jobs ,  which allows users to update the job data after every cycle . 
This helps in maintaining the question list in real time for reassignment to other regions .

The demo can be run by executing index.js with node . 
Cycle is set at 1 second interval for testing purposes . 
Any cron expression can be used to set the custom cycle . 

 
