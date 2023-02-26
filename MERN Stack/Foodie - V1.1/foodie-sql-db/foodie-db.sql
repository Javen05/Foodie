-- MySQL Script generated by MySQL Workbench
-- Wed Dec 14 09:56:40 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema foodieDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema foodieDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `foodieDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;
USE `foodieDB` ;

-- -----------------------------------------------------
-- Table `foodieDB`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`accounts` (
  `idAccount` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `picture` VARCHAR(100) NOT NULL DEFAULT '/defUser',
  `email` VARCHAR(255) NOT NULL,
  `phone` INT(8) NOT NULL,
  `date` DATE NOT NULL,
  `role` ENUM("R", "O", "M") NOT NULL DEFAULT 'R',
  PRIMARY KEY (`idAccount`),
  UNIQUE INDEX `idAccount_UNIQUE` (`idAccount` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`restaurants` (
  `idRestaurant` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` TEXT(100) NOT NULL,
  `idAccount` INT NULL,
  `menu` VARCHAR(100) NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`idRestaurant`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `idRestaurant_UNIQUE` (`idRestaurant` ASC) VISIBLE,
  INDEX `restaurantAccount_idx` (`idAccount` ASC) VISIBLE,
  CONSTRAINT `restaurantAccount`
    FOREIGN KEY (`idAccount`)
    REFERENCES `foodieDB`.`accounts` (`idAccount`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`images` (
  `idImage` INT NOT NULL AUTO_INCREMENT,
  `idRestaurant` INT NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idImage`),
  UNIQUE INDEX `idImage_UNIQUE` (`idImage` ASC) VISIBLE,
  CONSTRAINT `imagesForRestaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `foodieDB`.`restaurants` (`idRestaurant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`reviews` (
  `idRestaurant` INT NOT NULL,
  `idAccount` INT NOT NULL DEFAULT 0,
  `rating` ENUM("1", "2", "3", "4", "5") NOT NULL,
  `review` TEXT(100) NOT NULL,
  `date` DATE NOT NULL,
  `edited` ENUM("T", "F") NOT NULL DEFAULT 'F',
  INDEX `reviewOnRestaurant_idx` (`idRestaurant` ASC) VISIBLE,
  INDEX `reviewByAccount_idx` (`idAccount` ASC) VISIBLE,
  PRIMARY KEY (`idRestaurant`, `idAccount`),
  CONSTRAINT `reviewOnRestaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `foodieDB`.`restaurants` (`idRestaurant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `reviewByAccount`
    FOREIGN KEY (`idAccount`)
    REFERENCES `foodieDB`.`accounts` (`idAccount`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`comments` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `idRestaurant` INT NOT NULL,
  `idAccount` INT NOT NULL DEFAULT 0,
  `accountId` INT NOT NULL,
  `commentId` INT NULL,
  `comment` TEXT(100) NOT NULL,
  `date` DATE NOT NULL,
  `edited` ENUM("T", "F") NOT NULL DEFAULT 'F',
  PRIMARY KEY (`idComment`),
  INDEX `commentByAccount_idx` (`idAccount` ASC) VISIBLE,
  INDEX `commentOnComment_idx` (`commentId` ASC) VISIBLE,
  INDEX `commentOnReview_idx` (`idRestaurant` ASC, `idAccount` ASC) VISIBLE,
  CONSTRAINT `commentOnComment`
    FOREIGN KEY (`commentId`)
    REFERENCES `foodieDB`.`comments` (`idComment`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `commentByAccount`
    FOREIGN KEY (`idAccount`)
    REFERENCES `foodieDB`.`accounts` (`idAccount`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `commentOnReview`
    FOREIGN KEY (`idRestaurant` , `idAccount`)
    REFERENCES `foodieDB`.`reviews` (`idRestaurant` , `idAccount`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`upvotes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`upvotes` (
  `idRestaurant` INT NOT NULL,
  `idAccount` INT NOT NULL,
  `idComment` INT NULL DEFAULT 0,
  `accountId` INT NOT NULL,
  `vote` ENUM("L", "D") NOT NULL,
  INDEX `voteOnComment_idx` (`idComment` ASC) VISIBLE,
  INDEX `votedByAccount_idx` (`accountId` ASC) VISIBLE,
  PRIMARY KEY (`idRestaurant`, `idAccount`, `accountId`),
  CONSTRAINT `voteOnComment`
    FOREIGN KEY (`idComment`)
    REFERENCES `foodieDB`.`comments` (`idComment`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `votedByAccount`
    FOREIGN KEY (`accountId`)
    REFERENCES `foodieDB`.`accounts` (`idAccount`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `voteOnReview`
    FOREIGN KEY (`idRestaurant` , `idAccount`)
    REFERENCES `foodieDB`.`reviews` (`idRestaurant` , `idAccount`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`searches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`searches` (
  `idSearch` INT NOT NULL AUTO_INCREMENT,
  `idAccount` INT NOT NULL,
  `searchQuery` VARCHAR(50) NOT NULL,
  `datetime` DATETIME NOT NULL,
  PRIMARY KEY (`idSearch`),
  INDEX `searchByAccount_idx` (`idAccount` ASC) VISIBLE,
  CONSTRAINT `searchByAccount`
    FOREIGN KEY (`idAccount`)
    REFERENCES `foodieDB`.`accounts` (`idAccount`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`list` (
  `idAccount` INT NOT NULL,
  `idRestaurant` INT NOT NULL,
  `type` ENUM("F", "B") NOT NULL,
  `datetime` DATETIME NOT NULL,
  INDEX `onRestaurant_idx` (`idRestaurant` ASC) VISIBLE,
  PRIMARY KEY (`idAccount`, `idRestaurant`, `type`),
  CONSTRAINT `byAccount`
    FOREIGN KEY (`idAccount`)
    REFERENCES `foodieDB`.`accounts` (`idAccount`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `byRestaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `foodieDB`.`restaurants` (`idRestaurant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`categories` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `idRestaurant` INT NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idCategory`),
  INDEX `categoryOfRestaurant_idx` (`idRestaurant` ASC) VISIBLE,
  CONSTRAINT `categoryOfRestaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `foodieDB`.`restaurants` (`idRestaurant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`branches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`branches` (
  `idBranch` INT NOT NULL AUTO_INCREMENT,
  `idRestaurant` INT NOT NULL,
  `branch` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`idBranch`),
  INDEX `branchOfRestaurant_idx` (`idRestaurant` ASC) VISIBLE,
  CONSTRAINT `branchOfRestaurant`
    FOREIGN KEY (`idRestaurant`)
    REFERENCES `foodieDB`.`restaurants` (`idRestaurant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodieDB`.`branch_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodieDB`.`branch_details` (
  `idBranchDetails` INT NOT NULL AUTO_INCREMENT,
  `idBranch` INT NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idBranchDetails`),
  INDEX `detailForBranch_idx` (`idBranch` ASC) VISIBLE,
  CONSTRAINT `detailForBranch`
    FOREIGN KEY (`idBranch`)
    REFERENCES `foodieDB`.`branches` (`idBranch`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
