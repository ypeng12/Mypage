from pypdf import PdfReader

reader = PdfReader("YuliangPeng.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

print(text)
