<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $sender_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // Validate email
    if (!filter_var($sender_email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit();
    }

    // Email settings
    $to = "indunissanka@gmail.com";
    $subject = "New Inquiry from Contact Form";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $sender_email\n";
    $email_content .= "Message:\n$message\n";

    // Headers
    $headers = "From: $sender_email\r\n";
    $headers .= "Reply-To: $sender_email\r\n";

    // SMTP Configuration
    $smtp_host = 'smtp.gmail.com';
    $smtp_user = 'indunisssanka@gmail.com'; // Replace with your Gmail address
    $smtp_pass = '1@Nissanka';  // Replace with your Gmail password or app password
    $smtp_port = 587;

    // Sending email using SMTP
    require 'PHPMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_user;
    $mail->Password = $smtp_pass;
    $mail->SMTPSecure = 'tls';
    $mail->Port = $smtp_port;

    // Recipients
    $mail->setFrom($sender_email, $name);
    $mail->addAddress($to);

    // Content
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $email_content;

    if ($mail->send()) {
        echo "Email sent successfully!";
    } else {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    echo "Invalid request";
}
?>
