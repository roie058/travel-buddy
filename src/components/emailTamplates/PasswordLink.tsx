import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
import * as React from "react";

interface DropboxResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
  }
  
export const PasswordLink = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => { return (
    <Html>
      <Head lang='en' />
      <Preview>Travel Buddy reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://travelbuddy.website/images/logo.png`}
            width="40"
            height="33"
            alt="travelbuddy"
          />
          <Section lang='en'>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Travel Buddy
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
           
            <Text style={text}>Happy Adventuring!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordLink;

const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
  };
  
  const text = {
    fontSize: '16px',
    fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
  };
  
  const button = {
    backgroundColor: '#007ee6',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '210px',
    padding: '14px 7px',
  };
  