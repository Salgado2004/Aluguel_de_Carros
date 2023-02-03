import hashlib

senha = hashlib.sha1(b"laura2312").hexdigest()
print(senha)