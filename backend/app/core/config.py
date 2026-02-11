from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ULTRAVOX_API_KEY: str
    ULTRAVOX_MODEL: str = "fixie-ai/ultravox-70b"
    PORT: int = 8000
    DEFAULT_AGENT_ID: str | None = None

    # SIP / Asterisk Configuration
    ASTERISK_PUBLIC_HOST: str = "54.243.24.145"
    UVX_SIP_USERNAME: str | None = None
    UVX_SIP_PASSWORD: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()
