const rewire = require("rewire")
const Conversation = rewire("./Conversation")
const mapStateToProps = Conversation.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ login: { token: "{%", userId: "c466a48309794261b64a4f02cfcc3d64" }, toaster: { message: "Grader id does not match submission id that was passed in" }, chat: { chat: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ login: { token: ">", userId: 9876 }, toaster: { message: "Grader id does not match submission id that was passed in" }, chat: { chat: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ login: { token: ")", userId: 9876 }, toaster: { message: "Grader id does not match submission id that was passed in" }, chat: { chat: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ login: { token: "[", userId: "c466a48309794261b64a4f02cfcc3d64" }, toaster: { message: "Missing FileUri configuration" }, chat: { chat: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ login: { token: "-~", userId: 9876 }, toaster: { message: "This is an exception, voilà" }, chat: { chat: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
