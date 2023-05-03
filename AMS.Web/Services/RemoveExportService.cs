using System.IO;

namespace AMS.Web.Services
{
    public class RemoveExportService : IHostedService
    {
        private Timer _timer;
        private string path;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            TimeSpan interval = TimeSpan.FromSeconds(1);

            var nextRunTime = DateTime.Today.AddDays(0).AddHours(0).AddSeconds(5);
            var curTime = DateTime.Now;
            var firstInterval = nextRunTime.Subtract(curTime);

            Action action = () =>
            {
                var t1 = Task.Delay(3000);
                t1.Wait();
                //remove inactive accounts at expected time
               
                // now schedule it to be called every 24 hours for future
                // timer repeates call to RemoveScheduledAccounts every 24 hours.
                _timer = new Timer(
                    CleanDirectory,
                    null,
                    TimeSpan.Zero,
                    interval
                );
            };

            // no need to await this call here because this task is scheduled to run much much later.
            Task.Run(action);
            return Task.CompletedTask;
        }

        private void CleanDirectory(object? state)
        {
            path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot/Export"));
            System.IO.DirectoryInfo di = new DirectoryInfo(path);

            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
             _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
        }

      
    }
}
