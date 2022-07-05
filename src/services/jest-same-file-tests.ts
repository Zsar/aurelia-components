class ToBeTested {
    doSomething(): string {
        return "something"
    }
}

global.tests("ToBeTested", () => {
    it("doSomething does not crash", () => {
        const thingy = new ToBeTested()
        expect(thingy.doSomething()).toBeTruthy()
    })
})