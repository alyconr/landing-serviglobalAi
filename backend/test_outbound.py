import httpx
import asyncio
import os

# You can modify these values to test with real numbers
TEST_PHONE = "3106666709"  # Example Colombian mobile number
TEST_NAME = "Test User"
TEST_EMAIL = "test@example.com"


async def test_outbound_call():
    url = "http://localhost:8000/api/v1/call-outbound"

    payload = {
        "phone": TEST_PHONE,
        "name": TEST_NAME,
        "email": TEST_EMAIL,
        # "agent_id": "optional-agent-id-override"
    }

    print(f"Sending request to {url} with payload: {payload}")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=30.0)

        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Success! Response:")
            print(response.json())
        else:
            print("Error! Response:")
            print(response.text)

    except Exception as e:
        print(f"Request failed: {e}")


if __name__ == "__main__":
    asyncio.run(test_outbound_call())
