const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    // let SimpleStorageFactory
    // let simpleStorage
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should update name and favorite number when we call addPerson", async function () {
        const expectedName = "Jon"
        const expectedNumber = "18"
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedNumber
        )
        await transactionResponse.wait(1)

        const currentPerson = await simpleStorage.people(0)
        const currentName = currentPerson[0]
        const currentNumber = currentPerson[1]
        assert.equal(expectedName, currentPerson[1])
        assert.equal(expectedNumber, currentPerson[0].toString())

        // assert.equal(currentName.toString(), expectedName)
    })
})
