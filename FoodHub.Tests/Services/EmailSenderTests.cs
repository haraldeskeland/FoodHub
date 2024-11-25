using FoodHub.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using System.Threading.Tasks;

public class EmailSenderTests
{
    [Fact]
    public async Task SendEmailAsync_ShouldLogEmailDetails()
    {
        // Arrange
        var mockLogger = new Mock<ILogger<EmailSender>>();
        var emailSender = new EmailSender(mockLogger.Object);
        string email = "test@example.com";
        string subject = "Test Subject";
        string message = "This is a test email.";

        // Act
        await emailSender.SendEmailAsync(email, subject, message);

        // Assert
        mockLogger.Verify(
            logger => logger.Log(
                It.Is<LogLevel>(level => level == LogLevel.Information),
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains(email) && v.ToString().Contains(subject) && v.ToString().Contains(message)),
                It.IsAny<Exception>(),
                It.Is<Func<It.IsAnyType, Exception?, string>>((v, t) => true)),
            Times.Once);
    }
}

