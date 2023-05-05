using System.IO;

namespace AMS.Web.Services
{
    public class RemoveExportService : IHostedService
    {
        private Timer _timer;
        private string path;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            TimeSpan interval = TimeSpan.FromHours(24);
            //calculate time to run the first time & delay to set the timer
            //DateTime.Today gives time of midnight 00.00
            var nextRunTime = DateTime.Today.AddDays(1).AddHours(1);
            var curTime = DateTime.Now;
            var firstInterval = nextRunTime.Subtract(curTime);

            Action action = () =>
            {
                var t1 = Task.Delay(firstInterval);
                t1.Wait();

                _timer = new Timer(
                    CleanDirectory,
                    null,
                    TimeSpan.Zero,
                    interval
                );
            };

            return Task.CompletedTask;
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
