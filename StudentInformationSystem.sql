-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 03 Haz 2024, 03:06:22
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `StudentInformationSystem`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Attendance`
--

CREATE TABLE `Attendance` (
  `ID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Attendance`
--

INSERT INTO `Attendance` (`ID`, `StudentID`, `Date`, `Status`) VALUES
(32, 11, '2024-06-02', 1),
(33, 17, '2024-06-02', 1),
(34, 17, '2024-06-01', 0),
(35, 11, '2024-06-01', 1),
(36, 17, '2024-05-31', 0),
(37, 11, '2024-05-31', 0),
(38, 20, '2024-06-02', 1),
(39, 11, '2024-06-03', 1),
(40, 11, '2024-05-01', 0),
(41, 11, '2024-06-05', 1),
(42, 17, '2024-06-05', 1),
(43, 16, '2024-06-03', 0),
(44, 17, '2024-06-03', 0),
(45, 18, '2024-06-03', 0),
(46, 20, '2024-06-03', 0),
(47, 19, '2024-06-03', 0),
(48, 11, '2024-06-04', 1),
(49, 21, '2024-06-12', 1),
(50, 19, '2024-06-12', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Canteen`
--

CREATE TABLE `Canteen` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `ProductPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Canteen`
--

INSERT INTO `Canteen` (`ProductID`, `ProductName`, `ProductPrice`) VALUES
(8, 'Chocolate', 10),
(9, 'Biscuit', 15),
(10, 'Chips', 25);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `City`
--

CREATE TABLE `City` (
  `CityID` int(11) NOT NULL,
  `CityName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `City`
--

INSERT INTO `City` (`CityID`, `CityName`) VALUES
(1, 'ADANA'),
(2, 'ADIYAMAN'),
(3, 'AFYON'),
(4, 'AĞRI'),
(5, 'AMASYA'),
(6, 'ANKARA'),
(7, 'ANTALYA'),
(8, 'ARTVİN'),
(9, 'AYDIN'),
(10, 'BALIKESİR'),
(11, 'BİLECİK'),
(12, 'BİNGÖL'),
(13, 'BİTLİS'),
(14, 'BOLU'),
(15, 'BURDUR'),
(16, 'BURSA'),
(17, 'ÇANAKKALE'),
(18, 'ÇANKIRI'),
(19, 'ÇORUM'),
(20, 'DENİZLİ'),
(21, 'DİYARBAKIR'),
(22, 'EDİRNE'),
(23, 'ELAZIĞ'),
(24, 'ERZİNCAN'),
(25, 'ERZURUM'),
(26, 'ESKİŞEHİR'),
(27, 'GAZİANTEP'),
(28, 'GİRESUN'),
(29, 'GÜMÜŞHANE'),
(30, 'HAKKARİ'),
(31, 'HATAY'),
(32, 'ISPARTA'),
(33, 'İÇEL'),
(34, 'İSTANBUL'),
(35, 'İZMİR'),
(36, 'KARS'),
(37, 'KASTAMONU'),
(38, 'KAYSERİ'),
(39, 'KIRKLARELİ'),
(40, 'KIRŞEHİR'),
(41, 'KOCAELİ'),
(42, 'KONYA'),
(43, 'KÜTAHYA'),
(44, 'MALATYA'),
(45, 'MANİSA'),
(46, 'KAHRAMANMARAŞ'),
(47, 'MARDİN'),
(48, 'MUĞLA'),
(49, 'MUŞ'),
(50, 'NEVŞEHİR'),
(51, 'NİĞDE'),
(52, 'ORDU'),
(53, 'RİZE'),
(54, 'SAKARYA'),
(55, 'SAMSUN'),
(56, 'SİİRT'),
(57, 'SİNOP'),
(58, 'SİVAS'),
(59, 'TEKİRDAĞ'),
(60, 'TOKAT'),
(61, 'TRABZON'),
(62, 'TUNCELİ'),
(63, 'ŞANLIURFA'),
(64, 'UŞAK'),
(65, 'VAN'),
(66, 'YOZGAT'),
(67, 'ZONGULDAK'),
(68, 'AKSARAY'),
(69, 'BAYBURT'),
(70, 'KARAMAN'),
(71, 'KIRIKKALE'),
(72, 'BATMAN'),
(73, 'ŞIRNAK'),
(74, 'BARTIN'),
(75, 'ARDAHAN'),
(76, 'IĞDIR'),
(77, 'YALOVA'),
(78, 'KARABÜK'),
(79, 'KİLİS'),
(80, 'OSMANİYE'),
(81, 'DÜZCE');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Class`
--

CREATE TABLE `Class` (
  `ClassID` int(11) NOT NULL,
  `ClassName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Class`
--

INSERT INTO `Class` (`ClassID`, `ClassName`) VALUES
(23, '9-A'),
(24, '9-B'),
(26, '10-A'),
(29, '10-B');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Parent`
--

CREATE TABLE `Parent` (
  `ParentID` int(11) NOT NULL,
  `ParentName` varchar(255) NOT NULL,
  `ParentPhoneNumber` varchar(100) NOT NULL,
  `ParentEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Parent`
--

INSERT INTO `Parent` (`ParentID`, `ParentName`, `ParentPhoneNumber`, `ParentEmail`) VALUES
(23, 'Mary Smith', '(123) 456-7890', 'mary.smith@example.com'),
(27, 'Robert Johnson', '(234) 567-8901', 'robert.johnson@example.com'),
(28, 'Laura Brown', '(345) 678-9012', 'laura.brown@example.com'),
(29, 'James Davis', '(456) 789-0123', 'james.davis@example.com'),
(30, 'Sarah Miller', '(567) 890-1234', 'sarah.miller@example.com'),
(31, 'William Garcia', '(678) 901-2345', 'william.garcia@example.com\n'),
(32, 'Patricia Martinez', '(789) 012-3456', 'patricia.martinez@example.com');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Principal`
--

CREATE TABLE `Principal` (
  `ID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Principal`
--

INSERT INTO `Principal` (`ID`, `Username`, `Password`) VALUES
(3, 'emreolca', '123'),
(5, 'admin', '123'),
(6, 'newadmin', '123');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Settings`
--

CREATE TABLE `Settings` (
  `ID` int(11) NOT NULL,
  `PrincipalRegistrationCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Settings`
--

INSERT INTO `Settings` (`ID`, `PrincipalRegistrationCode`) VALUES
(1, '2024');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Student`
--

CREATE TABLE `Student` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Number` int(11) NOT NULL,
  `ClassID` int(11) NOT NULL,
  `Address` text NOT NULL,
  `Photo` varchar(500) NOT NULL,
  `CityID` int(11) NOT NULL,
  `ParentID` int(11) NOT NULL,
  `Balance` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Student`
--

INSERT INTO `Student` (`ID`, `Name`, `Number`, `ClassID`, `Address`, `Photo`, `CityID`, `ParentID`, `Balance`) VALUES
(11, 'John Cena', 11, 23, 'California', 'uploads/1717270456424-human-2.jpeg', 34, 23, 377),
(16, 'Batuhan Ozturk', 45, 23, 'Baglarbasi Mahallesi', 'uploads/1717270466371-human-6.jpeg', 34, 27, 9899),
(17, 'John Smith', 123, 23, '123 Maple St', 'uploads/1717270494227-human-5.jpeg', 35, 28, 0),
(18, 'Emma Johnson', 456, 24, '456 Oak Ave', 'uploads/1717270573578-human-1.jpeg', 35, 29, 0),
(19, 'Michael Brown', 789, 24, '789 Pine Rd', 'uploads/1717270661709-human-8.jpeg', 35, 30, 0),
(20, 'Olivia Davis', 234, 26, '234 Birch Blvd', 'uploads/1717270711270-human-7.jpeg', 35, 31, 0),
(21, 'William Miller', 567, 29, '567 Cedar Ln', 'uploads/1717270916156-human-9.jpeg', 35, 32, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `StudentBoughtProducts`
--

CREATE TABLE `StudentBoughtProducts` (
  `ID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `BuyDate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `StudentBoughtProducts`
--

INSERT INTO `StudentBoughtProducts` (`ID`, `StudentID`, `ProductID`, `BuyDate`) VALUES
(7, 11, 8, '6/3/2024, 2:53:24 AM'),
(8, 16, 10, '6/3/2024, 2:54:34 AM'),
(9, 16, 10, '6/3/2024, 2:54:55 AM'),
(10, 16, 10, '6/3/2024, 3:37:18 AM'),
(11, 11, 8, '6/3/2024, 3:53:04 AM');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `StudentRestrictedProducts`
--

CREATE TABLE `StudentRestrictedProducts` (
  `ID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `StudentRestrictedProducts`
--

INSERT INTO `StudentRestrictedProducts` (`ID`, `StudentID`, `ProductID`) VALUES
(39, 21, 10),
(40, 21, 8),
(41, 21, 9),
(45, 11, 10),
(53, 16, 8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Teacher`
--

CREATE TABLE `Teacher` (
  `TeacherID` int(11) NOT NULL,
  `TeacherName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Teacher`
--

INSERT INTO `Teacher` (`TeacherID`, `TeacherName`) VALUES
(7, 'David Green'),
(8, 'Karen White'),
(10, 'Lisa Thompson');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `TeacherClasses`
--

CREATE TABLE `TeacherClasses` (
  `ID` int(11) NOT NULL,
  `TeacherID` int(11) NOT NULL,
  `ClassID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `TeacherClasses`
--

INSERT INTO `TeacherClasses` (`ID`, `TeacherID`, `ClassID`) VALUES
(19, 7, 23),
(20, 7, 24),
(21, 8, 24),
(22, 8, 26),
(26, 10, 29);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `Attendance`
--
ALTER TABLE `Attendance`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `StudentID_FK` (`StudentID`);

--
-- Tablo için indeksler `Canteen`
--
ALTER TABLE `Canteen`
  ADD PRIMARY KEY (`ProductID`) USING BTREE;

--
-- Tablo için indeksler `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`CityID`) USING BTREE;

--
-- Tablo için indeksler `Class`
--
ALTER TABLE `Class`
  ADD PRIMARY KEY (`ClassID`) USING BTREE;

--
-- Tablo için indeksler `Parent`
--
ALTER TABLE `Parent`
  ADD PRIMARY KEY (`ParentID`);

--
-- Tablo için indeksler `Principal`
--
ALTER TABLE `Principal`
  ADD PRIMARY KEY (`ID`);

--
-- Tablo için indeksler `Settings`
--
ALTER TABLE `Settings`
  ADD PRIMARY KEY (`ID`);

--
-- Tablo için indeksler `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ClassID` (`ClassID`),
  ADD KEY `FK_ParentID` (`ParentID`),
  ADD KEY `FK_CityID` (`CityID`);

--
-- Tablo için indeksler `StudentBoughtProducts`
--
ALTER TABLE `StudentBoughtProducts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKK_StudentID` (`StudentID`),
  ADD KEY `FKK_ProductID` (`ProductID`);

--
-- Tablo için indeksler `StudentRestrictedProducts`
--
ALTER TABLE `StudentRestrictedProducts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_StudentID` (`StudentID`),
  ADD KEY `FK_ProductID` (`ProductID`);

--
-- Tablo için indeksler `Teacher`
--
ALTER TABLE `Teacher`
  ADD PRIMARY KEY (`TeacherID`) USING BTREE;

--
-- Tablo için indeksler `TeacherClasses`
--
ALTER TABLE `TeacherClasses`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TeacherID` (`TeacherID`),
  ADD KEY `FKT_ClassID` (`ClassID`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `Attendance`
--
ALTER TABLE `Attendance`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Tablo için AUTO_INCREMENT değeri `Canteen`
--
ALTER TABLE `Canteen`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `City`
--
ALTER TABLE `City`
  MODIFY `CityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Tablo için AUTO_INCREMENT değeri `Class`
--
ALTER TABLE `Class`
  MODIFY `ClassID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Tablo için AUTO_INCREMENT değeri `Parent`
--
ALTER TABLE `Parent`
  MODIFY `ParentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Tablo için AUTO_INCREMENT değeri `Principal`
--
ALTER TABLE `Principal`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `Student`
--
ALTER TABLE `Student`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Tablo için AUTO_INCREMENT değeri `StudentBoughtProducts`
--
ALTER TABLE `StudentBoughtProducts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `StudentRestrictedProducts`
--
ALTER TABLE `StudentRestrictedProducts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Tablo için AUTO_INCREMENT değeri `Teacher`
--
ALTER TABLE `Teacher`
  MODIFY `TeacherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `TeacherClasses`
--
ALTER TABLE `TeacherClasses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `Attendance`
--
ALTER TABLE `Attendance`
  ADD CONSTRAINT `StudentID_FK` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`ID`);

--
-- Tablo kısıtlamaları `Student`
--
ALTER TABLE `Student`
  ADD CONSTRAINT `FK_CityID` FOREIGN KEY (`CityID`) REFERENCES `City` (`CityID`),
  ADD CONSTRAINT `FK_ClassID` FOREIGN KEY (`ClassID`) REFERENCES `Class` (`ClassID`),
  ADD CONSTRAINT `FK_ParentID` FOREIGN KEY (`ParentID`) REFERENCES `Parent` (`ParentID`);

--
-- Tablo kısıtlamaları `StudentBoughtProducts`
--
ALTER TABLE `StudentBoughtProducts`
  ADD CONSTRAINT `FKK_ProductID` FOREIGN KEY (`ProductID`) REFERENCES `Canteen` (`ProductID`),
  ADD CONSTRAINT `FKK_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`ID`);

--
-- Tablo kısıtlamaları `StudentRestrictedProducts`
--
ALTER TABLE `StudentRestrictedProducts`
  ADD CONSTRAINT `FK_ProductID` FOREIGN KEY (`ProductID`) REFERENCES `Canteen` (`ProductID`),
  ADD CONSTRAINT `FK_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`ID`);

--
-- Tablo kısıtlamaları `TeacherClasses`
--
ALTER TABLE `TeacherClasses`
  ADD CONSTRAINT `FKT_ClassID` FOREIGN KEY (`ClassID`) REFERENCES `Class` (`ClassID`),
  ADD CONSTRAINT `FK_TeacherID` FOREIGN KEY (`TeacherID`) REFERENCES `Teacher` (`TeacherID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
