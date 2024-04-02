-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 132.145.18.222
-- Generation Time: Mar 18, 2024 at 11:37 PM
-- Server version: 10.3.39-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `Calendar`
--

CREATE TABLE `Calendar` (
  `eventid` int(9) NOT NULL,
  `userid` int(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Generalcomment`
--

CREATE TABLE `Generalcomment` (
  `generalcommentid` int(9) NOT NULL,
  `serverid` int(9) NOT NULL,
  `userid` int(9) NOT NULL,
  `message` varchar(500) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Generalimage`
--

CREATE TABLE `Generalimage` (
  `generalimageid` int(9) NOT NULL,
  `serverid` int(9) NOT NULL,
  `userid` int(9) NOT NULL,
  `image` varchar(200) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Pollresponse`
--

CREATE TABLE `Pollresponse` (
  `optionid` int(9) NOT NULL,
  `userid` int(9) NOT NULL,
  `responseid` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Server`
--

CREATE TABLE `Server` (
  `serverid` int(9) NOT NULL,
  `creatorid` int(9) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(2000) DEFAULT '',
  `picture` varchar(200) DEFAULT NULL,
  `banner` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Thread`
--

CREATE TABLE `Thread` (
  `threadid` int(9) NOT NULL,
  `title` varchar(100) NOT NULL,
  `body` varchar(2000) NOT NULL DEFAULT '',
  `serverid` int(9) NOT NULL,
  `creatorid` int(9) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `threadtype` enum('Poll','Image','Doc','Text') NOT NULL DEFAULT 'Text',
  `likecount` int(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Threadcomment`
--

CREATE TABLE `Threadcomment` (
  `threadcommentid` int(9) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userid` int(9) NOT NULL,
  `threadid` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Threaddoc`
--

CREATE TABLE `Threaddoc` (
  `threadid` int(9) NOT NULL,
  `doclink` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Threadimage`
--

CREATE TABLE `Threadimage` (
  `threadid` int(9) NOT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Threadpoll`
--

CREATE TABLE `Threadpoll` (
  `optionid` int(9) NOT NULL,
  `threadid` int(9) NOT NULL,
  `option` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userid` int(9) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `pfp` varchar(200) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userid`, `username`, `password`, `pfp`, `email`, `gender`, `firstname`, `surname`) VALUES
(1, 'Johndoe', 'waeflijadkfjhas', NULL, 'johndoe@aol.com', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `Userinserver`
--

CREATE TABLE `Userinserver` (
  `userid` int(9) NOT NULL,
  `serverid` int(9) NOT NULL,
  `permission` enum('creator','admin','default','reduced') NOT NULL DEFAULT 'default',
  `muted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Calendar`
--
ALTER TABLE `Calendar`
  ADD PRIMARY KEY (`eventid`),
  ADD KEY `usercalendar` (`userid`);

--
-- Indexes for table `Generalcomment`
--
ALTER TABLE `Generalcomment`
  ADD PRIMARY KEY (`generalcommentid`),
  ADD KEY `servercomment` (`serverid`),
  ADD KEY `usercomment` (`userid`),
  ADD KEY `message` (`message`);

--
-- Indexes for table `Generalimage`
--
ALTER TABLE `Generalimage`
  ADD PRIMARY KEY (`generalimageid`),
  ADD KEY `serverimage` (`serverid`),
  ADD KEY `userimage` (`userid`);

--
-- Indexes for table `Pollresponse`
--
ALTER TABLE `Pollresponse`
  ADD PRIMARY KEY (`responseid`),
  ADD KEY `pollquestion` (`optionid`),
  ADD KEY `userpollresponse` (`userid`);

--
-- Indexes for table `Server`
--
ALTER TABLE `Server`
  ADD PRIMARY KEY (`serverid`),
  ADD KEY `servercreator` (`creatorid`);

--
-- Indexes for table `Thread`
--
ALTER TABLE `Thread`
  ADD PRIMARY KEY (`threadid`),
  ADD KEY `threadserver` (`serverid`),
  ADD KEY `threaduser` (`creatorid`);

--
-- Indexes for table `Threadcomment`
--
ALTER TABLE `Threadcomment`
  ADD PRIMARY KEY (`threadcommentid`),
  ADD KEY `threadcommentthreadid` (`threadid`),
  ADD KEY `threadcommentuserid` (`userid`);

--
-- Indexes for table `Threaddoc`
--
ALTER TABLE `Threaddoc`
  ADD UNIQUE KEY `threadid` (`threadid`),
  ADD KEY `threadisdoc` (`threadid`);

--
-- Indexes for table `Threadimage`
--
ALTER TABLE `Threadimage`
  ADD UNIQUE KEY `threadid` (`threadid`),
  ADD KEY `threadisimage` (`threadid`);

--
-- Indexes for table `Threadpoll`
--
ALTER TABLE `Threadpoll`
  ADD PRIMARY KEY (`optionid`),
  ADD KEY `threadispoll` (`threadid`),
  ADD KEY `threadid` (`threadid`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `username_index` (`username`);

--
-- Indexes for table `Userinserver`
--
ALTER TABLE `Userinserver`
  ADD PRIMARY KEY (`userid`,`serverid`),
  ADD KEY `serverid` (`serverid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Calendar`
--
ALTER TABLE `Calendar`
  MODIFY `eventid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Generalcomment`
--
ALTER TABLE `Generalcomment`
  MODIFY `generalcommentid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Generalimage`
--
ALTER TABLE `Generalimage`
  MODIFY `generalimageid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Pollresponse`
--
ALTER TABLE `Pollresponse`
  MODIFY `responseid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Server`
--
ALTER TABLE `Server`
  MODIFY `serverid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Thread`
--
ALTER TABLE `Thread`
  MODIFY `threadid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Threadcomment`
--
ALTER TABLE `Threadcomment`
  MODIFY `threadcommentid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Threadpoll`
--
ALTER TABLE `Threadpoll`
  MODIFY `optionid` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `userid` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Calendar`
--
ALTER TABLE `Calendar`
  ADD CONSTRAINT `usercalendar` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Generalcomment`
--
ALTER TABLE `Generalcomment`
  ADD CONSTRAINT `servercomment` FOREIGN KEY (`serverid`) REFERENCES `Server` (`serverid`),
  ADD CONSTRAINT `usercomment` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`);

--
-- Constraints for table `Generalimage`
--
ALTER TABLE `Generalimage`
  ADD CONSTRAINT `serverimage` FOREIGN KEY (`serverid`) REFERENCES `Server` (`serverid`),
  ADD CONSTRAINT `userimage` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`);

--
-- Constraints for table `Pollresponse`
--
ALTER TABLE `Pollresponse`
  ADD CONSTRAINT `pollquestion` FOREIGN KEY (`optionid`) REFERENCES `Threadpoll` (`optionid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userpollresponse` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Server`
--
ALTER TABLE `Server`
  ADD CONSTRAINT `servercreator` FOREIGN KEY (`creatorid`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Thread`
--
ALTER TABLE `Thread`
  ADD CONSTRAINT `threadserver` FOREIGN KEY (`serverid`) REFERENCES `Server` (`serverid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `threaduser` FOREIGN KEY (`creatorid`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Threadcomment`
--
ALTER TABLE `Threadcomment`
  ADD CONSTRAINT `threadcommentthreadid` FOREIGN KEY (`threadid`) REFERENCES `Thread` (`threadid`),
  ADD CONSTRAINT `threadcommentuserid` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`);

--
-- Constraints for table `Threaddoc`
--
ALTER TABLE `Threaddoc`
  ADD CONSTRAINT `threadisdoc` FOREIGN KEY (`threadid`) REFERENCES `Thread` (`threadid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Threadimage`
--
ALTER TABLE `Threadimage`
  ADD CONSTRAINT `threadisimage` FOREIGN KEY (`threadid`) REFERENCES `Thread` (`threadid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Threadpoll`
--
ALTER TABLE `Threadpoll`
  ADD CONSTRAINT `threadid` FOREIGN KEY (`threadid`) REFERENCES `Thread` (`threadid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Userinserver`
--
ALTER TABLE `Userinserver`
  ADD CONSTRAINT `serverid` FOREIGN KEY (`serverid`) REFERENCES `Server` (`serverid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
