// import { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } from 'agora-token'

const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-token')

// const app_id = prompt("Enter you unique ID")

const generateRtcToken = async () => {
  // Rtc Examples
  const appId = 'c7cfed0f9e184b9391b8ec5132d8f114';
  const appCertificate = 'fdd5b35cb16748969afa1fd40c2360f3';
  const channelName = 'Proctor-live';
  const uid = 1;
  const userAccount = "inyangette@gmail.com";
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
  console.log("Token With Integer Number Uid: " + tokenA);

  // Build token with user account
  const tokenB = RtcTokenBuilder.buildTokenWithAccount(appId, appCertificate, channelName, userAccount, role, privilegeExpiredTs);
  console.log("Token With UserAccount: " + tokenB);
}

generateRtcToken();

