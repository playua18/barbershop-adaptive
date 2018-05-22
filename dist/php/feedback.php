<?php
//    require('constant.php');
    require('phpmailer/src/PHPMailer.php');
    require('phpmailer/src/SMTP.php');

//// Присвоение данных переменным из массива $ _POST
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
//    $surname = filter_var($_POST["sender_surname"], FILTER_SANITIZE_STRING);
//    $patronymic = filter_var($_POST["sender_patronymic"], FILTER_SANITIZE_STRING);
//    $country = filter_var($_POST["sender_country"], FILTER_SANITIZE_STRING);
//    $count = filter_var($_POST["sender_count"], FILTER_SANITIZE_STRING);
//    $from = filter_var($_POST["sender_email"], FILTER_SANITIZE_EMAIL);
//    $phone = filter_var($_POST["sender_phone"], FILTER_SANITIZE_NUMBER_INT);
//    $assessment = $_POST['assessment_r_group'];
//    $visited = nl2br(implode(', ', $_POST['visited_ch_group']));
//    $date_from = $_POST["from"];
//    $date_to = $_POST["to"];
//    $msg = filter_var($_POST["sender_msg"], FILTER_SANITIZE_STRING);
//
//
//   if (empty($name)) {
//       $empty[] = "<b>Имя</b>";
//   }
//   // if (empty($surname)) {
//   //     $empty[] = "<b>Фамилия</b>";
//   // }
//   // if (empty($patronymic)) {
//   //     $empty[] = "<b>Отчество</b>";
//   // }
//   if (empty($country)) {
//       $empty[] = "<b>Выберите свою страну</b>";
//   }
//   if (empty($count)) {
//       $empty[] = "<b>Количество персон</b>";
//   }
//   if (empty($from)) {
//       $empty[] = "<b>Электронная почта</b>";
//   }
//   // if (empty($phone)) {
//   //     $empty[] = "<b>Контактный телефон</b>";
//   // }
//   // if (empty($assessment)) {
//   //     $empty[] = "<b>Ваше общее впечатление</b>";
//   // }
//   if (empty($visited)) {
//       $empty[] = "<b>Посещенные достопримечательности</b>";
//   }
//   if (empty($msg)) {
//       $empty[] = "<b>Сообщение</b>";
//   }
//   if (!empty($empty)) {
//       $output = json_encode(array('type' => 'error', 'text' => 'Заполните поля: ' . implode(", ", $empty)));
//       die($output);
//   }
//
//   if (!filter_var($from, FILTER_VALIDATE_EMAIL)) { //email validation
//       $output = json_encode(array('type' => 'error', 'text' => '<b>' . $from . '</b>' . ' неверный email, пожалуйста, исправьте его.'));
//       die($output);
//   }
//
//   //reCAPTCHA validation
//   if (isset($_POST['g-recaptcha-response'])) {
//
//       require('recaptcha/autoload.php');
//
//       $recaptcha = new \ReCaptcha\ReCaptcha(SECRET_KEY, new \ReCaptcha\RequestMethod\SocketPost());
//
//       $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
//
//       if (!$resp->isSuccess()) {
//           $output = json_encode(array('type' => 'error', 'text' => 'Подтвердите <b>Captcha</b>!'));
//           die($output);
//       }
//   }

// Тема письма
    $subject = 'borodinski.kl.com.ua Сообщение от ' . $name;

//// Стиль письма:
//    $wrapper_s = '<div style="font-weight: bold; font-size: 14px; background: rgba(200, 50 , 50, 0.5); padding: 30px; border: 3px solid #74C26D; box-shadow: inset 2px 3px 5px #444, inset -2px -2px 1px #ccc;">';
//    $item_s = '<div style="margin-bottom: 10px;">';
//    $option_s = '<span style="text-shadow: 1px 1px 0 #156282; color: #56B6C2;">';
//    $value_s = '<span style="text-shadow: 1px 1px 0 #858223; color: #fafa00; letter-spacing: 1px;">';
//    $div_e = '</div>';
//    $span_e = '</span>';
//    $br = '<br>';
//    $semicolon = ';';
//
////// Строим body для email
//    $body = $wrapper_s . $item_s . $option_s . 'Имя: ' . $span_e . $value_s . $name . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Фамилия: ' . $span_e . $value_s . $surname . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Отчество: ' . $span_e . $value_s . $patronymic . $semicolon . $span_e . $div_e . $br .
////    $item_s . $option_s . 'E-mail: ' . $span_e . $value_s . $from . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Электронная почта: ' . $span_e . $value_s . $from . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Cтрана: ' . $span_e . $value_s . $country . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Персоны: ' . $span_e . $value_s . $count . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Тел.: ' . $span_e . $value_s . $phone . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Общее впечатление: ' . $span_e . $value_s . $assessment . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Посещенные достопримечательности: ' . $span_e . $value_s . $visited . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Период пребывания от ' . $span_e . $value_s . $date_from . $option_s . ' до ' . $span_e . $date_to . $semicolon . $span_e . $div_e . $br .
//        $item_s . $option_s . 'Сообщение: ' . $span_e . $value_s . $msg . $semicolon . $span_e . $div_e . $div_e;
////       . $br . 'Вложения: ';
////        $item_s . $option_s . 'Вложения: ' . $span_e . $photos . $div_e . $div_e;

//// Мой email
    $to = "admin@borodinski.kl.com.ua"; // мой email
    $from = "admin@borodinski.kl.com.ua";

// Строим headers сообщения
//  $headers = 'From: ' . $from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua, нужно указывать свой email
//    $headers = 'From: ' . $to . "Content-type: text/html; charset=\"utf-8\"\r\n"; // Content-type: text/html - для отображения html тегов в сообщении
//$headers .= 'Reply-To: ' . $from . "\r\n";

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
//    $mail->AddReplyTo($from, $name);
    $mail->AddAddress("admin@borodinski.kl.com.ua");
//     $mail->Subject = $subject; // тема письма
// //    $mail->WordWrap   = 80;
//     $mailer->Body = $body;
//    $mail->MsgHTML($msg);

    // Отправляем почту
//$mail->Subject = $subject; // Заголовок письма
//$mail->Body = $body;
$mail->IsHTML(true);

// for multi attach
for ($ct = 0; $ct < count($_FILES['file']['tmp_name']); $ct++) {
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['file']['name'][$ct]));
    $filename = $_FILES['file']['name'][$ct];
    if (move_uploaded_file($_FILES['file']['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
    } else {
        $msg .= 'Не удалось переместить файл в ' . $uploadfile;
    }
}

//for single file
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
    $output = json_encode(array('type' => 'error', 'text' => 'Не удалось отправить письмо, пожалуйста, свяжитесь с нами: ' . '<b>' . $to . '<b>'));
    die($output);
} else {
    $output = json_encode(array('type' => 'msg', 'text' => $name . ', Спасибо за отзыв'));
    die($output);
  }
?>
