<?php
    require('php/phpmailer/src/PHPMailer.php');
    require('php/phpmailer/src/SMTP.php');

$to = 'admin@borodinski.kl.com.ua';
$name = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);

// $mail = new PHPMailer();
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet = 'UTF-8';
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port     = 587;  
    $mail->Username = "admin@borodinski.kl.com.ua";
    $mail->Password = "Dk086818";
    $mail->Host     = "mail.zzz.com.ua";
$mail->Mailer   = "smtp";
$mail->SetFrom($to, $name);
// $mail->AddReplyTo($_POST["admin@borodinski.kl.com.ua"], $_POST["admin@borodinski.kl.com.ua"]);
$mail->AddAddress("admin@borodinski.kl.com.ua");	
$mail->Subject = $_POST["subject"];
$mail->WordWrap   = 80;
$mail->MsgHTML($_POST["content"]);

// if(is_array($_FILES)) {
// $mail->AddAttachment($_FILES['attachmentFile']['tmp_name'],$_FILES['attachmentFile']['name']); 
// }
$mail->IsHTML(true);

if(is_array($_FILES['attachmentFile'])) {
       $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['attachmentFile']['name']));
       $filename = $_FILES['attachmentFile']['name'];
       if (move_uploaded_file($_FILES['attachmentFile']['tmp_name'], $uploadfile)) {
           $mail->addAttachment($uploadfile, $filename);
       } else {
           $msg .= 'Failed to move file to ' . $uploadfile;
       }
   }


if(!$mail->Send()) {
	echo "<p class='error'>Problem in Sending Mail.</p>";
} else {
	echo "<p class='success'>Contact Mail Sent.</p>";
}	
?>