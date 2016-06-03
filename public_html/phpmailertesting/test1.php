<?php
require '/home/randkigr/public_html/phpmailertesting/PHPMailer_5.2.4/class.phpmailer.php';

$mail = new PHPMailer;
    
$incoming_name = @trim(stripslashes($_POST['name'])); 
$incoming_email = @trim(stripslashes($_POST['email'])); 
$incoming_phone = @trim(stripslashes($_POST['phone'])); 
$incoming_message = @trim(stripslashes($_POST['message'])); 
    
//$mail->IsSMTP();                                      // Set mailer to use SMTP
//$mail->Host = "localhost";  // Specify main and backup server
//$mail->SMTPAuth = true;                               // Enable SMTP authentication
//$mail->Username = $incoming_name;                            // SMTP username
//$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted
 
$mail->IsSMTP(); // telling the class to use SMTP 
$mail->SMTPSecure = "ssl"; 
$mail->Host='server146.web-hosting.com'; 
$mail->Port='465'; 
$mail->Username = 'contactus@randomkreations.com'; // SMTP account username
$mail->Password = 'Krunal@1986';
$mail->SMTPKeepAlive = true; 
$mail->Mailer = "smtp"; 
$mail->SMTPAuth = true; // enable SMTP authentication 
$mail->CharSet = 'utf-8';

$mail->From = 'contactus@randomkreations.com';
$mail->FromName = $incoming_name;

$mail->AddAddress('contactus@randomkreations.com');               // Name is optional

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->IsHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Message from: ' .$incoming_email;
// $mail->Body = "<html>	<body><h3> " .$incoming_name . "  says:  </h3><p><h4 style=font-family: Times New Roman>" . $incoming_message .  "</h4></p> </body> </html>";
$mail->Body = "<html> 
				<body>
					<div>
						<ul style='list-style-type: none'>
							<li>
								<p><h3> " . $incoming_name . "  says:  </h3>" . $incoming_message . ".<p>
							</li>
						 	<li>
								<p><h3> Contact number is: </h3>" . $incoming_phone . ".<p>
							</li>
						</ul>
					</div>
				</body>
			</html>";



					
				
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->Sender = 'contactus@randomkreations.com'; // indicates ReturnPath header
$mail->AddReplyTo( $incoming_email, "Reply from Random Kreations" ); // indicates ReplyTo headers

$mail->CharSet="windows-1251";   //If the message contains cyrilic or other non-latin characters like unicode, you should specify the charset used:
$mail->CharSet="utf-8";

$mail->SMTPDebug = 1;


if(!$mail->Send()) {
	$return = array('retCode'=> 0,'errorMessage'=>"Failure to send email.Please refresh the page and try again");
    //echo 'Mailer Error: ' . $mail->ErrorInfo;
    exit;
} else {
	$return = array('retCode'=> 200,'errorMessage'=>"Thank you for contacting us.");
	
}
echo json_encode($return);

?>














