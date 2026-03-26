def add_two_integers(a, b):
    return a + b

def main():
    try:
        x = int(input("Enter first integer: "))
        y = int(input("Enter second integer: "))
    except ValueError:
        print("Error: please enter valid integers.")
        return

    result = add_two_integers(x, y)
    print("Sum:", result)

if __name__ == "__main__":
    main()