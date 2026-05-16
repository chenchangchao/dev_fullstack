import resend


if __name__ == "__main__":
    resend.api_key = "your_api_key"
    # r = resend.send(
    #     {
    #         "from": "onboarding@resend.dev",
    #         "to": "chenchangchao@360.cn",
    #         "subject": "Hello World",
    #         "html": "<p>Congrats on sending your <strong>first email</strong>!</p>",
    #     }
    # )
    params: resend.Emails.SendParams = {
    "from": "Acme <onboarding@resend.dev>",
    "to": ["chenchangchao@360.cn"],
    "subject": "hello world",
    "html": "<strong>it works!</strong>"}

    email = resend.Emails.send(params)
    print(email)
