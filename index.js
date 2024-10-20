// total no. of cycles
const CYCLE_LIMIT = 10;
// cycles are managed using cron expressions
// default is 7 pm SGT  Monday Weekly
const cycle = "0 19 * * 1";

const  Bull = require('bull');


var assigned_cycles = [];

const queue0  = new Bull('region0');
const queue1 = new Bull('region1');

const queue = [queue0 , queue1];
for(let i = 0 ; i < queue.length ; i++) {
queue[i].add("region"+i,
  { question: i*CYCLE_LIMIT  },
  {
    repeat: {
      every: 1000,
      limit: CYCLE_LIMIT
    }
  }
);

queue[i].process("*", function (job) {
  if (assigned_cycles.length === 2)
  assigned_cycles = [i*CYCLE_LIMIT + job.opts.repeat.count];
  else {
    assigned_cycles.push(i*CYCLE_LIMIT + job.opts.repeat.count);

  }
  job.data.question = assigned_cycles;

  console.log(assigned_cycles);

  return Promise.resolve();
});

  queue[i].on('global:completed', function (jobId, result) {
  console.log(`Job ${jobId} completed! Result: ${result}`);

  queue[i].getJob(jobId).then(function (job) {
    job.remove();
  });
});
}
