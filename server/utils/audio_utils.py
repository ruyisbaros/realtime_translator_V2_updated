import wave
import os


def save_as_wav(audio_data, file_path):
    """
    Save raw PCM audio data as a WAV file.
    """
    with wave.open(file_path, "wb") as wav_file:
        wav_file.setnchannels(2)  # Stereo
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(44100)  # 44.1 kHz sample rate
        wav_file.writeframes(audio_data)


def create_temp_audio_folder():
    """
    Ensure the temp_audio folder exists in the project's root directory.
    """
    # Get the directory of the current script
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Define the path for the temp_audio folder in the root
    temp_folder = os.path.join(base_dir, "../temp_audio")
    os.makedirs(temp_folder, exist_ok=True)
    return temp_folder
