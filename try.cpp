#include<iostream>
using namespace std;

int main()
{
   string text{"my big and long string  "};
    // find last space, counting from backwards
    int i = text.length() - 1; // last character
    while (i != 0 && !isspace(text[i]))
    {
      --i;
    }
    string lastword = text.substr(i+1); // +1 to skip leading space
    cout << lastword << endl;
    
    return 0;
}