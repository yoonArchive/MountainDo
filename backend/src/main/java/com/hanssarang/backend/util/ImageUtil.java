package com.hanssarang.backend.util;

import com.hanssarang.backend.common.exception.BadRequestException;
import com.hanssarang.backend.common.exception.FileSaveException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import static com.hanssarang.backend.common.domain.ErrorMessage.FAIL_TO_SAVE_FILE;
import static com.hanssarang.backend.common.domain.ErrorMessage.WRONG_CONTENT_TYPE;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUtil {

    private static final String IMAGE_ROOT_PATH = "/home/ubuntu/img";
    private static final String DELIMITER = "-";

    public static String saveImage(MultipartFile multipartFile, String path) {
        validateContentType(multipartFile);
        StringBuilder imageUploadPath = new StringBuilder(new File(IMAGE_ROOT_PATH).getAbsolutePath());
        imageUploadPath.append(File.separator).append(path);
        File imageFile = new File(imageUploadPath.toString());
        if (!imageFile.exists()) {
            imageFile.mkdir();
        }
        imageUploadPath.append(File.separator).append(UUID.randomUUID()).append(DELIMITER).append(LocalDateTime.now())
                .append(POINT).append(extractExt(multipartFile.getContentType()));
        String imageUrl = imageUploadPath.toString();
        try {
            multipartFile.transferTo(new File(imageUrl));
        } catch (IOException e) {
            throw new FileSaveException(FAIL_TO_SAVE_FILE);
        }
        return imageUrl;
    }

    private static String extractExt(String contentType) {
        return contentType.substring(contentType.lastIndexOf(SEPARATOR) + 1);
    }

    private static void validateContentType(String contentType) {
        if (isWrongContentType(contentType)) {
            throw new BadRequestException(WRONG_CONTENT_TYPE);
        }
    }

    private static boolean isWrongContentType(String contentType) {
        return !(contentType.contains("image/jpg") || contentType.contains("image/jpeg") || contentType.contains("image/png"));
    }
}
