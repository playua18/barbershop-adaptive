<?php
    require('keys.php');
    require('phpmailer/src/PHPMailer.php');
    require('phpmailer/src/SMTP.php');

    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $surname = filter_var($_POST["surname"], FILTER_SANITIZE_STRING);
    $patronymic = filter_var($_POST["patronymic"], FILTER_SANITIZE_STRING);
    $from = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $tel = filter_var($_POST["tel"], FILTER_SANITIZE_NUMBER_INT);
    $radio = $_POST['r_group'];
    $checkbox = nl2br(implode(', ', $_POST['ch_group']));
    $date = $_POST["date"];
    $msg = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);


   if (empty($name)) {
       $empty[] = "<b>Имя</b>";
   }
//   // if (empty($surname)) {
//   //     $empty[] = "<b>Фамилия</b>";
//   // }
//   // if (empty($patronymic)) {
//   //     $empty[] = "<b>Отчество</b>";
//   // }
//   if (empty($from)) {
//       $empty[] = "<b>Электронная почта</b>";
//   }
//   // if (empty($tel)) {
//   //     $empty[] = "<b>Контактный телефон</b>";
//   // }
//   // if (empty($radio)) {
//   //     $empty[] = "<b>Ваше общее впечатление</b>";
//   // }
//   if (empty($checkbox)) {
//       $empty[] = "<b>Посещенные достопримечательности</b>";
//   }
//   if (empty($msg)) {
//       $empty[] = "<b>Сообщение</b>";
//   }
   if (!empty($empty)) {
       $output = json_encode(array('type' => 'error', 'text' => 'Заполните поля: ' . implode(", ", $empty)));
       die($output);
   }

   if (!filter_var($from, FILTER_VALIDATE_EMAIL)) { //email validation
       $output = json_encode(array('type' => 'error', 'text' => '<b>' . $from . '</b>' . ' неверный email, пожалуйста, исправьте его.'));
       die($output);
   }

   //reCAPTCHA validation
   if (isset($_POST['g-recaptcha-response'])) {

       require('recaptcha/autoload.php');

       $recaptcha = new \ReCaptcha\ReCaptcha(SECRET_KEY, new \ReCaptcha\RequestMethod\SocketPost());

       $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

       if (!$resp->isSuccess()) {
           $output = json_encode(array('type' => 'error', 'text' => 'Подтвердите <b>Captcha</b>!'));
           die($output);
       }
   }

$br = '<br>';
$body = 'Имя: ' . $name . $br .
        'Фамилия: ' . $surname . $br .
        'Отчество: ' . $patronymic . $br .
        'Электронная почта: ' . $from . $br .
        'Тел.: ' . $tel . $br .
        'Модель бороды: ' . $radio . $br .
        'Дополнительные услуги: ' . $checkbox . $br .
        'Время посещения: ' . $date . $br .
        'Сообщение: ' . $msg;

$to = 'admin@borodinski.kl.com.ua';
$name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
$subject = 'borodinski.kl.com.ua - новое сообщение от ' . $name;

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
//$mail->Subject = $_POST["subject"];
//$mail->WordWrap   = 80;
//$mail->MsgHTML($_POST["msg"]);

$mail->Subject = $subject;
$mail->Body = $body;
$mail->IsHTML(true);

for ($ct = 0; $ct < count($_FILES['file']['tmp_name']); $ct++) {
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['file']['name'][$ct]));
    $filename = $_FILES['file']['name'][$ct];
    if (move_uploaded_file($_FILES['file']['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
    } else {
        $msg .= 'Не удалось переместить файл в ' . $uploadfile;
    }
}


//if(!$mail->Send()) {
//	echo "<p class='error'>Проблемы с отправкой!</p>";
//} else {
//	echo "<p class='success'>Сообщение отправлено!</p>";
//}
//

if(!$mail->Send()) {
    $output = json_encode(array('type' => 'error', 'text' => 'Не удалось отправить письмо, пожалуйста, свяжитесь с нами: ' . '<b>' . $to . '<b>'));
    die($output);
} else {
    $output = json_encode(array('type' => 'done', 'text' => $name . ', ждем Вас в назначенное время!'));
    die($output);
  }
?>
