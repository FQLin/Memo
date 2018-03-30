
class Program
{
    static void Main(string[] args)
    {
        var testImagePath = @"D:\Visual Studio 2017\Projects\TuPianHanziShibie\Tesseract\test.jpg";


        using (var engine = new TesseractEngine(@"./tessdata", "chi_sim", EngineMode.Default))
        {
            using (var img = Pix.LoadFromFile(testImagePath))
            {
                using (var page = engine.Process(img))
                {
                    var text = page.GetText();
                    //可信度
                    Console.WriteLine("Mean confidence: {0}", page.GetMeanConfidence());

                    Console.WriteLine("Text (GetText): \r\n{0}", text);
                    Console.WriteLine("Text (iterator):");
                    using (var iter = page.GetIterator())
                    {
                        iter.Begin();

                        do
                        {
                            do
                            {
                                do
                                {
                                    do
                                    {
                                        if (iter.IsAtBeginningOf(PageIteratorLevel.Block))
                                        {
                                            Console.WriteLine("<BLOCK>");
                                        }

                                        Console.Write(iter.GetText(PageIteratorLevel.Word));
                                        Console.Write(" ");

                                        if (iter.IsAtFinalOf(PageIteratorLevel.TextLine, PageIteratorLevel.Word))
                                        {
                                            Console.WriteLine();
                                        }
                                    } while (iter.Next(PageIteratorLevel.TextLine, PageIteratorLevel.Word));

                                    if (iter.IsAtFinalOf(PageIteratorLevel.Para, PageIteratorLevel.TextLine))
                                    {
                                        Console.WriteLine();
                                    }
                                } while (iter.Next(PageIteratorLevel.Para, PageIteratorLevel.TextLine));
                            } while (iter.Next(PageIteratorLevel.Block, PageIteratorLevel.Para));
                        } while (iter.Next(PageIteratorLevel.Block));
                    }
                }
            }
        }

        Console.ReadKey();
    }
}
