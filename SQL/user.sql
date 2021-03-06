CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `DisplayName` text NOT NULL,
  `MembershipType` enum('None','BuildersClub','TurboBuildersClub','OutrageousBuildersClub','Premium') NOT NULL DEFAULT 'None',
  `Description` text NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` datetime NOT NULL,
  `IsBanned` tinyint NOT NULL DEFAULT '0',
  `AgeBracket` tinyint NOT NULL DEFAULT '0',
  `Roles` json NOT NULL,
  `CountryCode` text NOT NULL,
  `UserAbove13` tinyint NOT NULL DEFAULT '0',
  `IsAdmin` tinyint NOT NULL DEFAULT '0',
  `AccountId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Id_idx` (`AccountId`),
  CONSTRAINT `FK_AccountId` FOREIGN KEY (`AccountId`) REFERENCES `robloxaccounting`.`account` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
