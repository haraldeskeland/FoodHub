using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace FoodHub.Services
{
    // This class implements the IEmailSender interface to send emails.
    public class EmailSender : IEmailSender
    {
        private readonly ILogger _logger;

        // Constructor that accepts an ILogger instance for logging purposes.
        public EmailSender(ILogger<EmailSender> logger)
        {
            _logger = logger;
        }

        // Method to send an email asynchronously.
        // Logs the email details and returns a completed task.
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            _logger.LogInformation($"Email: {email}, Subject: {subject}, Message: {htmlMessage}");
            return Task.CompletedTask;
        }
    }
}